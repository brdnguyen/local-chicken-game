// ============= HOUSE CHORES SYSTEM =============
// Shared chores logic for the Virtual Chicken Game
// Used by index.html for the House Chore Challenge feature
//
// Dependencies (must be loaded before this script):
// - gameState object with: parentFaceData, parentPhotoDataUrl, pendingChores, bonusActionsEarned, bonusActionsDate
// - Functions: checkAndResetDailyQuota(), getTodayDateString(), saveGame(), showPopup(), updateDailyActionsDisplay()

let parentCameraStream = null;
let approvalCameraStream = null;

// Stop all chores-related cameras
function stopChoresCameras() {
  if (parentCameraStream) {
    parentCameraStream.getTracks().forEach((track) => track.stop());
    parentCameraStream = null;
  }
  if (approvalCameraStream) {
    approvalCameraStream.getTracks().forEach((track) => track.stop());
    approvalCameraStream = null;
  }
  // Hide camera containers
  const parentCam = document.getElementById("parent-register-camera");
  const approvalCam = document.getElementById("approval-camera");
  if (parentCam) parentCam.style.display = "none";
  if (approvalCam) approvalCam.style.display = "none";
}

// Render the chores tab based on current state
function renderChoresTab() {
  checkAndResetDailyQuota();

  const bonusEarned = gameState.bonusActionsEarned || 0;
  const hasParent = gameState.parentFaceData !== null;
  const pendingChores = gameState.pendingChores || [];
  const today = getTodayDateString();
  const alreadyApprovedToday =
    gameState.bonusActionsDate === today && bonusEarned >= 2;

  // Update bonus display
  const bonusDisplay = document.getElementById("chores-bonus-display");
  const bonusAmount = document.getElementById("bonus-actions-earned");
  if (bonusAmount) bonusAmount.textContent = bonusEarned;
  if (bonusDisplay) {
    bonusDisplay.classList.toggle("earned", bonusEarned >= 2);
  }

  // Update step indicators
  updateChoreSteps(hasParent, pendingChores.length, alreadyApprovedToday);

  // Show/hide parent registration sections
  const notRegistered = document.getElementById("parent-not-registered");
  const registered = document.getElementById("parent-registered");
  if (hasParent) {
    if (notRegistered) notRegistered.style.display = "none";
    if (registered) {
      registered.style.display = "flex";
      const preview = document.getElementById("parent-photo-preview");
      if (preview && gameState.parentPhotoDataUrl) {
        preview.src = gameState.parentPhotoDataUrl;
      }
    }
  } else {
    if (notRegistered) notRegistered.style.display = "block";
    if (registered) registered.style.display = "none";
  }

  // Render pending chores list
  renderPendingChores();

  // Show/hide chore input form
  const choreForm = document.getElementById("chore-input-form");
  const allChoresAdded = document.getElementById("all-chores-added");
  const choreNumber = document.getElementById("chore-number");

  if (pendingChores.length >= 2 || alreadyApprovedToday) {
    if (choreForm) choreForm.style.display = "none";
    if (allChoresAdded && !alreadyApprovedToday)
      allChoresAdded.style.display = "block";
    if (allChoresAdded && alreadyApprovedToday)
      allChoresAdded.style.display = "none";
  } else {
    if (choreForm) choreForm.style.display = "block";
    if (allChoresAdded) allChoresAdded.style.display = "none";
    if (choreNumber) choreNumber.textContent = pendingChores.length + 1;
  }

  // Show/hide approval sections
  const noChores = document.getElementById("no-chores-to-approve");
  const readyForApproval = document.getElementById(
    "chores-ready-for-approval"
  );
  const alreadyApproved = document.getElementById(
    "already-approved-today"
  );

  if (alreadyApprovedToday) {
    if (noChores) noChores.style.display = "none";
    if (readyForApproval) readyForApproval.style.display = "none";
    if (alreadyApproved) alreadyApproved.style.display = "block";
  } else if (pendingChores.length >= 2 && hasParent) {
    if (noChores) noChores.style.display = "none";
    if (readyForApproval) readyForApproval.style.display = "block";
    if (alreadyApproved) alreadyApproved.style.display = "none";
    renderApprovalChoreList();
  } else {
    if (noChores) noChores.style.display = "block";
    if (readyForApproval) readyForApproval.style.display = "none";
    if (alreadyApproved) alreadyApproved.style.display = "none";
  }
}

function updateChoreSteps(hasParent, choreCount, approved) {
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");
  const step3 = document.getElementById("step-3");

  // Reset all
  [step1, step2, step3].forEach((s) => {
    if (s) s.classList.remove("active", "completed");
  });

  if (approved) {
    // All done!
    if (step1) step1.classList.add("completed");
    if (step2) step2.classList.add("completed");
    if (step3) step3.classList.add("completed");
  } else if (choreCount >= 2 && hasParent) {
    // Ready for approval
    if (step1) step1.classList.add("completed");
    if (step2) step2.classList.add("completed");
    if (step3) step3.classList.add("active");
  } else if (hasParent) {
    // Parent registered, doing chores
    if (step1) step1.classList.add("completed");
    if (step2) step2.classList.add("active");
  } else {
    // Need parent registration
    if (step1) step1.classList.add("active");
  }
}

function renderPendingChores() {
  const container = document.getElementById("chores-pending-list");
  if (!container) return;

  const chores = gameState.pendingChores || [];
  if (chores.length === 0) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = chores
    .map(
      (chore, i) => `
      <div class="chore-card pending">
        <div class="chore-number">${i + 1}</div>
        <div class="chore-title">${escapeHtml(chore.title)}</div>
        <div class="chore-desc">${escapeHtml(chore.desc)}</div>
        <div class="chore-status pending">⏳ Awaiting approval</div>
      </div>
    `
    )
    .join("");
}

function renderApprovalChoreList() {
  const container = document.getElementById("approval-chore-list");
  if (!container) return;

  const chores = gameState.pendingChores || [];
  container.innerHTML = chores
    .map(
      (chore, i) => `
      <div style="padding: 8px; background: #f5f5f5; border-radius: 8px; margin: 5px 0;">
        <strong>${i + 1}. ${escapeHtml(chore.title)}</strong>
        <div style="font-size: 0.9em; color: #666;">${escapeHtml(
          chore.desc
        )}</div>
      </div>
    `
    )
    .join("");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ============= PARENT REGISTRATION =============
async function startParentRegistration() {
  const cameraContainer = document.getElementById(
    "parent-register-camera"
  );
  const video = document.getElementById("parent-register-video");
  const statusEl = document.getElementById("parent-register-status");
  const startBtn = document.getElementById("start-parent-register-btn");
  const captureBtn = document.getElementById("capture-parent-btn");
  const cancelBtn = document.getElementById("cancel-parent-register-btn");

  try {
    statusEl.textContent = "📷 Starting camera...";
    statusEl.className = "scanner-status scanning";

    parentCameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 320 },
        height: { ideal: 240 },
      },
    });

    video.srcObject = parentCameraStream;
    cameraContainer.style.display = "block";
    startBtn.classList.add("hidden");
    captureBtn.classList.remove("hidden");
    cancelBtn.style.display = "inline-block";
    statusEl.textContent =
      "👤 Position your face in the oval, then tap Capture";
    statusEl.className = "scanner-status scanning";
  } catch (err) {
    console.error("Camera error:", err);
    statusEl.textContent =
      "❌ Could not access camera. Please allow camera permission.";
    statusEl.className = "scanner-status error";
  }
}

function cancelParentRegistration() {
  if (parentCameraStream) {
    parentCameraStream.getTracks().forEach((track) => track.stop());
    parentCameraStream = null;
  }
  const cameraContainer = document.getElementById(
    "parent-register-camera"
  );
  const startBtn = document.getElementById("start-parent-register-btn");
  const captureBtn = document.getElementById("capture-parent-btn");
  const cancelBtn = document.getElementById("cancel-parent-register-btn");
  const statusEl = document.getElementById("parent-register-status");

  cameraContainer.style.display = "none";
  startBtn.classList.remove("hidden");
  captureBtn.classList.add("hidden");
  cancelBtn.style.display = "none";
  statusEl.textContent = "";
}

function captureParentFace() {
  const video = document.getElementById("parent-register-video");
  const canvas = document.getElementById("parent-register-canvas");
  const ctx = canvas.getContext("2d");
  const statusEl = document.getElementById("parent-register-status");

  // Set canvas size to video size
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Mirror the image (since video is mirrored with CSS)
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0);
  ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform

  // Extract face region (center area where face guide is)
  const faceX = canvas.width * 0.25;
  const faceY = canvas.height * 0.1;
  const faceW = canvas.width * 0.5;
  const faceH = canvas.height * 0.8;
  const faceData = ctx.getImageData(faceX, faceY, faceW, faceH);

  // Generate face histogram/signature
  const faceHistogram = generateFaceSignature(faceData);

  // Create a small preview image
  const previewCanvas = document.createElement("canvas");
  previewCanvas.width = 100;
  previewCanvas.height = 100;
  const previewCtx = previewCanvas.getContext("2d");
  // Draw circular preview
  previewCtx.beginPath();
  previewCtx.arc(50, 50, 50, 0, Math.PI * 2);
  previewCtx.clip();
  previewCtx.drawImage(
    canvas,
    faceX,
    faceY,
    faceW,
    faceH,
    0,
    0,
    100,
    100
  );
  const previewDataUrl = previewCanvas.toDataURL("image/jpeg", 0.7);

  // Save to game state
  gameState.parentFaceData = faceHistogram;
  gameState.parentPhotoDataUrl = previewDataUrl;
  saveGame();

  // Stop camera and update UI
  cancelParentRegistration();
  statusEl.textContent = "✅ Parent registered successfully!";
  statusEl.className = "scanner-status success";

  showPopup(
    "👨‍👩‍👧 Parent registered!<br>Now your child can record chores for approval."
  );
  renderChoresTab();
}

function resetParentRegistration() {
  if (
    confirm(
      "Re-register parent face? The current registration will be removed."
    )
  ) {
    gameState.parentFaceData = null;
    gameState.parentPhotoDataUrl = null;
    saveGame();
    renderChoresTab();
  }
}

// ============= FACE RECOGNITION =============
// Generate a face signature using color histograms and basic features
function generateFaceSignature(imageData) {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;

  // Color histogram (RGB channels, 16 bins each)
  const histR = new Array(16).fill(0);
  const histG = new Array(16).fill(0);
  const histB = new Array(16).fill(0);

  // Average color per region (divide into 3x3 grid)
  const regions = [];
  const regionW = Math.floor(width / 3);
  const regionH = Math.floor(height / 3);

  for (let ry = 0; ry < 3; ry++) {
    for (let rx = 0; rx < 3; rx++) {
      let rSum = 0,
        gSum = 0,
        bSum = 0,
        count = 0;
      const startX = rx * regionW;
      const startY = ry * regionH;

      for (let y = startY; y < startY + regionH && y < height; y++) {
        for (let x = startX; x < startX + regionW && x < width; x++) {
          const i = (y * width + x) * 4;
          rSum += data[i];
          gSum += data[i + 1];
          bSum += data[i + 2];
          count++;

          // Also populate histogram
          histR[Math.floor(data[i] / 16)]++;
          histG[Math.floor(data[i + 1] / 16)]++;
          histB[Math.floor(data[i + 2] / 16)]++;
        }
      }

      if (count > 0) {
        regions.push({
          r: Math.round(rSum / count),
          g: Math.round(gSum / count),
          b: Math.round(bSum / count),
        });
      }
    }
  }

  // Normalize histograms
  const totalPixels = width * height;
  const normalize = (arr) => arr.map((v) => v / totalPixels);

  // Calculate brightness variance (texture measure)
  let brightnessSum = 0;
  let brightnessSqSum = 0;
  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    brightnessSum += brightness;
    brightnessSqSum += brightness * brightness;
  }
  const avgBrightness = brightnessSum / (data.length / 4);
  const brightnessVariance =
    brightnessSqSum / (data.length / 4) - avgBrightness * avgBrightness;

  return {
    histR: normalize(histR),
    histG: normalize(histG),
    histB: normalize(histB),
    regions: regions,
    avgBrightness: avgBrightness,
    brightnessVariance: brightnessVariance,
  };
}

// Compare two face signatures
function compareFaceSignatures(sig1, sig2) {
  if (!sig1 || !sig2) return 0;

  // Histogram correlation (for each channel)
  const histCorr = (h1, h2) => {
    let sum = 0;
    for (let i = 0; i < h1.length; i++) {
      sum += Math.min(h1[i], h2[i]);
    }
    return sum; // Returns 0-1, higher = more similar
  };

  const rCorr = histCorr(sig1.histR, sig2.histR);
  const gCorr = histCorr(sig1.histG, sig2.histG);
  const bCorr = histCorr(sig1.histB, sig2.histB);
  const histScore = (rCorr + gCorr + bCorr) / 3;

  // Region color similarity
  let regionScore = 0;
  if (
    sig1.regions &&
    sig2.regions &&
    sig1.regions.length === sig2.regions.length
  ) {
    for (let i = 0; i < sig1.regions.length; i++) {
      const r1 = sig1.regions[i];
      const r2 = sig2.regions[i];
      const colorDist = Math.sqrt(
        Math.pow(r1.r - r2.r, 2) +
          Math.pow(r1.g - r2.g, 2) +
          Math.pow(r1.b - r2.b, 2)
      );
      // Max distance is sqrt(3 * 255^2) ≈ 441
      regionScore += 1 - colorDist / 441;
    }
    regionScore /= sig1.regions.length;
  }

  // Brightness similarity
  const brightnessDiff =
    Math.abs(sig1.avgBrightness - sig2.avgBrightness) / 255;
  const brightnessScore = 1 - brightnessDiff;

  // Variance similarity (texture)
  const maxVariance = 10000; // Reasonable max
  const varianceDiff =
    Math.abs(sig1.brightnessVariance - sig2.brightnessVariance) /
    maxVariance;
  const varianceScore = 1 - Math.min(varianceDiff, 1);

  // Weighted final score
  const finalScore =
    histScore * 0.35 +
    regionScore * 0.35 +
    brightnessScore * 0.15 +
    varianceScore * 0.15;

  return finalScore;
}

// ============= CHORE ENTRY =============
function addChore() {
  const titleInput = document.getElementById("chore-title-input");
  const descInput = document.getElementById("chore-desc-input");

  const title = titleInput.value.trim();
  const desc = descInput.value.trim();

  if (!title) {
    showPopup("📝 Please enter what chore you did!");
    return;
  }

  if (title.length < 5) {
    showPopup("📝 Please be more specific about the chore!");
    return;
  }

  if (!desc || desc.length < 10) {
    showPopup("📝 Please describe what you did in more detail!");
    return;
  }

  // Add the chore
  if (!gameState.pendingChores) gameState.pendingChores = [];
  gameState.pendingChores.push({
    title: title,
    desc: desc,
    addedAt: Date.now(),
  });
  saveGame();

  // Clear inputs
  titleInput.value = "";
  descInput.value = "";

  // Show feedback
  const choreNum = gameState.pendingChores.length;
  if (choreNum >= 2) {
    showPopup(
      "🎉 Great! Both chores recorded!<br>Ask your parent to approve them!"
    );
  } else {
    showPopup(`✅ Chore ${choreNum} added!<br>Now add one more chore.`);
  }

  renderChoresTab();
}

// ============= PARENT APPROVAL =============
async function startApprovalVerification() {
  if (!gameState.parentFaceData) {
    showPopup("⚠️ Parent needs to register first!");
    return;
  }

  const cameraContainer = document.getElementById("approval-camera");
  const video = document.getElementById("approval-video");
  const statusEl = document.getElementById("approval-status");
  const startBtn = document.getElementById("start-approval-btn");
  const verifyBtn = document.getElementById("verify-face-btn");
  const cancelBtn = document.getElementById("cancel-approval-btn");
  const resultDiv = document.getElementById("face-match-result");

  resultDiv.style.display = "none";

  try {
    statusEl.textContent = "📷 Starting camera...";
    statusEl.className = "scanner-status scanning";

    approvalCameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 320 },
        height: { ideal: 240 },
      },
    });

    video.srcObject = approvalCameraStream;
    cameraContainer.style.display = "block";
    startBtn.style.display = "none";
    verifyBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
    statusEl.textContent =
      "👤 Parent: Position face in oval, then tap Verify";
    statusEl.className = "scanner-status scanning";
  } catch (err) {
    console.error("Camera error:", err);
    statusEl.textContent = "❌ Could not access camera.";
    statusEl.className = "scanner-status error";
  }
}

function cancelApproval() {
  if (approvalCameraStream) {
    approvalCameraStream.getTracks().forEach((track) => track.stop());
    approvalCameraStream = null;
  }
  const cameraContainer = document.getElementById("approval-camera");
  const startBtn = document.getElementById("start-approval-btn");
  const verifyBtn = document.getElementById("verify-face-btn");
  const cancelBtn = document.getElementById("cancel-approval-btn");
  const statusEl = document.getElementById("approval-status");
  const resultDiv = document.getElementById("face-match-result");

  cameraContainer.style.display = "none";
  startBtn.style.display = "inline-block";
  verifyBtn.style.display = "none";
  cancelBtn.style.display = "none";
  statusEl.textContent = "";
  resultDiv.style.display = "none";
}

function verifyAndApprove() {
  const video = document.getElementById("approval-video");
  const canvas = document.getElementById("approval-canvas");
  const ctx = canvas.getContext("2d");
  const statusEl = document.getElementById("approval-status");
  const resultDiv = document.getElementById("face-match-result");
  const matchIcon = document.getElementById("match-icon");
  const matchMessage = document.getElementById("match-message");

  // Set canvas size
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Mirror and draw
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Extract face region
  const faceX = canvas.width * 0.25;
  const faceY = canvas.height * 0.1;
  const faceW = canvas.width * 0.5;
  const faceH = canvas.height * 0.8;
  const faceData = ctx.getImageData(faceX, faceY, faceW, faceH);

  // Generate signature and compare
  const currentSignature = generateFaceSignature(faceData);
  const similarity = compareFaceSignatures(
    gameState.parentFaceData,
    currentSignature
  );

  statusEl.textContent = "";
  resultDiv.style.display = "block";

  // Threshold for match (0.55 = 55% similar, fairly lenient)
  const MATCH_THRESHOLD = 0.55;

  if (similarity >= MATCH_THRESHOLD) {
    // Success!
    resultDiv.className = "face-match-result success";
    matchIcon.textContent = "✅";
    matchMessage.innerHTML = `
      <strong>Parent verified!</strong><br>
      <span style="font-size: 0.9em; color: #666;">Match confidence: ${Math.round(
        similarity * 100
      )}%</span>
    `;

    // Award bonus actions
    gameState.bonusActionsEarned = 2;
    gameState.bonusActionsDate = getTodayDateString();
    gameState.pendingChores = []; // Clear pending chores
    
    // Add pot bonus for completing chores (if addPotBonus function exists)
    let potBonusMsg = '';
    if (typeof addPotBonus === 'function') {
      addPotBonus('chores', 1.00);
      potBonusMsg = '<br><span style="color: #d4a574;">🏺 +$1.00 added to pot!</span>';
    }
    
    saveGame();

    // Stop camera
    cancelApproval();

    // Show celebration
    setTimeout(() => {
      showPopup(
        "🎉 Chores approved!<br><strong>+2 bonus actions</strong> earned today!" + potBonusMsg + "<br>Great job helping out!"
      );
      renderChoresTab();
      updateDailyActionsDisplay();
      if (typeof updatePotDisplay === 'function') updatePotDisplay();
    }, 1000);
  } else {
    // Failed to match
    resultDiv.className = "face-match-result fail";
    matchIcon.textContent = "❌";
    matchMessage.innerHTML = `
      <strong>Face not recognized</strong><br>
      <span style="font-size: 0.9em; color: #666;">Please try again. Make sure lighting is similar to registration.</span>
    `;
  }
}
