import { Encoder } from 'flac.js';

export const webm2flac = async (webmBlob: Blob): Promise<Blob> => {
  // Step 1: Convert WebM blob to ArrayBuffer
  const arrayBuffer = await webmBlob.arrayBuffer();

  // Step 2: Decode the WebM audio using Web Audio API
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  // Step 3: Get the raw PCM data for all channels
  const numberOfChannels = audioBuffer.numberOfChannels;
  const channelData: Float32Array[] = [];
  for (let i = 0; i < numberOfChannels; i++) {
    channelData.push(audioBuffer.getChannelData(i));
  }

  // Step 4: Initialize FLAC encoder
  const sampleRate = audioBuffer.sampleRate;
  const bitsPerSample = 16; // Commonly used value
  const encoder = new Encoder(sampleRate, numberOfChannels, bitsPerSample);

  // Step 5: Prepare the samples for encoding
  const samples: Int32Array[] = channelData.map(channel => {
    const channelSamples = new Int32Array(channel.length);
    for (let i = 0; i < channel.length; i++) {
      channelSamples[i] = Math.floor(channel[i] * 0x7FFF); // Convert float to 16-bit PCM
    }
    return channelSamples;
  });

  // Step 6: Encode the audio
  encoder.encode(samples);

  // Step 7: Get the encoded FLAC data
  const flacUint8Array = encoder.finish();

  // Step 8: Create a Blob from the FLAC data
  return new Blob([flacUint8Array], { type: 'audio/flac' });
}