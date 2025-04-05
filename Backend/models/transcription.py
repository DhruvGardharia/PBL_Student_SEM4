import google.generativeai as genai
from google.cloud import speech_v1 as speech

def transcribe_audio_with_gemini_key(audio_file_path, gemini_api_key):
    """
    Transcribes an audio file using the Google Cloud Speech-to-Text API,
    utilizing the provided Gemini API key for authentication (if possible).

    Note: While you're providing the Gemini API key, the Google Cloud
    Speech-to-Text API typically uses its own authentication mechanism
    through Google Cloud service accounts or other methods. The direct
    use of a Gemini API key might not be the standard way to authenticate
    with the Speech-to-Text API. However, if your Gemini API key is associated
    with a Google Cloud project that has the Speech-to-Text API enabled,
    the underlying authentication might be handled.

    Args:
        audio_file_path (str): The path to the audio file.
        gemini_api_key (str): Your Google Gemini API key.

    Returns:
        str: The transcribed text, or None if an error occurs.
    """
    try:
        # Initialize the Speech-to-Text client
        client = speech.SpeechClient()

        # Configure the audio input
        with open(audio_file_path, "rb") as f:
            content = f.read()
        audio = speech.RecognitionAudio(content=content)

        # Configure the recognition request
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,  # Adjust based on your audio file
            sample_rate_hertz=16000,  # Adjust based on your audio file
            language_code="en-US",  # Adjust based on your audio language
        )

        # Perform the transcription
        response = client.recognize(config=config, audio=audio)

        # Extract the transcribed text
        transcript = ""
        for result in response.results:
            transcript += result.alternatives[0].transcript + " "
        return transcript.strip()

    except FileNotFoundError:
        print(f"Error: Audio file not found at {audio_file_path}")
        return None
    except Exception as e:
        print(f"An error occurred during transcription: {e}")
        return None

if __name__ == "__main__":
    # Replace 'path/to/your/audio.wav' with the actual path to your audio file
    audio_file_path = r"path/to/your/audio.wav"
    # Replace 'YOUR_GEMINI_API_KEY' with your actual Gemini API key
    api_key = "AIzaSyALFZ1UWWdAvAZwqsTM_oyV0ZYfan8-Iec"

    transcribed_text = transcribe_audio_with_gemini_key(audio_file_path, api_key)

    if transcribed_text:
        print("Transcription:")
        print(transcribed_text)
    else:
        print("Could not transcribe the audio.")