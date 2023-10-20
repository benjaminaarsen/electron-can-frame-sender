async function pcanConnected() {
  const result = await window.api.getCurrentDevice();
  return result;
}

export default pcanConnected;
