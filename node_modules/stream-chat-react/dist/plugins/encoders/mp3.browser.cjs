"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/plugins/encoders/mp3.ts
var mp3_exports = {};
__export(mp3_exports, {
  encodeToMp3: () => encodeToMp3
});
module.exports = __toCommonJS(mp3_exports);

// src/components/ReactFileUtilities/utils.ts
var import_react = require("react");
var readFileAsArrayBuffer = (file) => new Promise((resolve, reject) => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    resolve(fileReader.result);
  };
  fileReader.onerror = () => {
    reject(fileReader.error);
  };
  fileReader.readAsArrayBuffer(file);
});

// src/components/MediaRecorder/transcode/audioProcessing.ts
var toAudioBuffer = async (file) => {
  const audioCtx = new AudioContext();
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const decodedData = await audioCtx.decodeAudioData(arrayBuffer);
  if (audioCtx.state !== "closed") await audioCtx.close();
  return decodedData;
};
var renderAudio = async (audioBuffer, sampleRate) => {
  const offlineAudioCtx = new OfflineAudioContext(
    audioBuffer.numberOfChannels,
    audioBuffer.duration * sampleRate,
    sampleRate
  );
  const source = offlineAudioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(offlineAudioCtx.destination);
  source.start();
  return await offlineAudioCtx.startRendering();
};

// src/plugins/encoders/mp3.ts
var ENCODING_BIT_RATE = 128;
var COUNT_SAMPLES_PER_ENCODED_BLOCK = 1152;
var float32ArrayToInt16Array = (float32Arr) => {
  const int16Arr = new Int16Array(float32Arr.length);
  for (let i = 0; i < float32Arr.length; i++) {
    const float32Value = float32Arr[i];
    const clampedValue = Math.max(-1, Math.min(1, float32Value));
    int16Arr[i] = Math.round(clampedValue * 32767);
  }
  return int16Arr;
};
var splitDataByChannel = (audioBuffer) => Array.from(
  { length: audioBuffer.numberOfChannels },
  (_, i) => audioBuffer.getChannelData(i)
).map(float32ArrayToInt16Array);
async function encodeToMp3(file, sampleRate) {
  const lameJs = await import("@breezystack/lamejs");
  const audioBuffer = await renderAudio(await toAudioBuffer(file), sampleRate);
  const channelCount = audioBuffer.numberOfChannels;
  const dataByChannel = splitDataByChannel(audioBuffer);
  const mp3Encoder = new lameJs.Mp3Encoder(channelCount, sampleRate, ENCODING_BIT_RATE);
  const dataBuffer = [];
  let remaining = dataByChannel[0].length;
  for (let i = 0; remaining >= COUNT_SAMPLES_PER_ENCODED_BLOCK; i += COUNT_SAMPLES_PER_ENCODED_BLOCK) {
    const [leftChannelBlock, rightChannelBlock] = dataByChannel.map(
      (channel) => channel.subarray(i, i + COUNT_SAMPLES_PER_ENCODED_BLOCK)
    );
    dataBuffer.push(
      new Int8Array(mp3Encoder.encodeBuffer(leftChannelBlock, rightChannelBlock))
    );
    remaining -= COUNT_SAMPLES_PER_ENCODED_BLOCK;
  }
  const lastBlock = mp3Encoder.flush();
  if (lastBlock.length) dataBuffer.push(new Int8Array(lastBlock));
  return new Blob(dataBuffer, { type: "audio/mp3;sbu_type=voice" });
}
//# sourceMappingURL=mp3.browser.cjs.map
