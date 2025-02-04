# Use the official TensorFlow image from Docker Hub
FROM tensorflow/tensorflow:2.6.0

# Install any additional dependencies
RUN pip install --upgrade pip && \
    pip install numpy pandas boto3 scikit-learn flask

# Copy the 'script' folder into the container
COPY script /app/script

# Set the working directory inside the container
WORKDIR /app/script

EXPOSE 5000

COPY script/app.py /app/

# Set the default command to run the training script (you can replace train_script.py with your actual script name)
CMD ["python", "app.py"]
