      const captureButton = document.getElementById('captureButton');
      const video = document.getElementById('video');
      const freezeButton = document.getElementById('freezeButton');
      const capturedCanvas = document.getElementById('capturedCanvas');
      const capturedContext = capturedCanvas.getContext('2d');
      const resetButton = document.getElementById('resetButton');
      const resultContainer = document.getElementById('resultContainer');

      let stream;

      captureButton.addEventListener('click', async () => {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
          freezeButton.style.display = 'block';
          resetButton.style.display = 'block';
          captureButton.style.display = 'none';
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      });

      freezeButton.addEventListener('click', async () => {
        capturedCanvas.width = video.videoWidth;
        capturedCanvas.height = video.videoHeight;
        capturedContext.drawImage(video, 0, 0, capturedCanvas.width, capturedCanvas.height);

        video.style.display = 'none';
        capturedCanvas.style.display = 'block';
        capturedCanvas.style.width = '100%';

        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }

        const imageData = capturedCanvas.toDataURL('image/jpeg');
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        try {
          const response = await fetch('/analyze_picture/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({ image_data: imageData }),
          });

          const data = await response.json();
          const result = data.result;

          resultContainer.innerHTML = result
            ? 'This item is recyclable!'
            : 'This item is not recyclable.';
          resultContainer.style.border = result ? '3px solid green' : '3px solid red';
        } catch (error) {
          console.error('Error analyzing picture:', error);
        }
      });

      resetButton.addEventListener('click', async () => {
        try {
          video.style.display = 'block';
          capturedCanvas.style.display = 'none';
          resultContainer.innerHTML = '';
          resultContainer.style.border = 'none';
          freezeButton.style.display = 'block';
          resetButton.style.display = 'block';
          captureButton.style.display = 'none';

          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      });