let model;

async function loadModel() {
  model = await mobilenet.load();
  console.log("Model Loaded Successfully!");
}

loadModel();

const imageUpload = document.getElementById('imageUpload');
const uploadedImage = document.getElementById('uploadedImage');
const classifyButton = document.getElementById('classifyButton');
const predictionsList = document.getElementById('predictions');

imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      uploadedImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

classifyButton.addEventListener('click', async () => {
  if (!uploadedImage.src || uploadedImage.src === window.location.href) {
    alert("Please upload an image first!");
    return;
  }
  
  const predictions = await model.classify(uploadedImage);
  
  predictionsList.innerHTML = '';

  predictions.forEach(prediction => {
    const li = document.createElement('li');
    li.textContent = `${prediction.className} - ${(prediction.probability * 100).toFixed(2)}%`;
    predictionsList.appendChild(li);
  });
});
