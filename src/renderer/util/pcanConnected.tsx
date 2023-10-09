function pcanConnected() {
  const result = window.api.ipcRenderer
    .invoke('get-status')
    .then((res: any) => {
      return res;
    });
  return result;
}

export default pcanConnected;
