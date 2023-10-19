async function pcanConnected() {
  const result = await window.api.getStatus();
  return result;
}

export default pcanConnected;
