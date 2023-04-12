if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/serviceWorker.js")
    .then((reg) => {
      console.log("Service Worker registered", reg);
    })
    .catch((error) => {
      console.log("Service Worker not registered", error);
    });
}
