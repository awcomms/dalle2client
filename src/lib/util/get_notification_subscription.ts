export {}
/*
	// import url8 from "$lib/util/url8";
  const getSub = () => {
    navigator.serviceWorker.ready
      .then((registration) => {
        return registration.pushManager.getSubscription().then(async (sub) => {
          if (sub) {
            return sub;
          }

          const response = await fetch(`get`);
          const vapidKey = await response.text();
          let int8VapidKey = url8(vapidKey);
          const options = {
            userVisibleOnly: true,
            applicationServerKey: int8VapidKey,
          };
          return registration.pushManager.subscribe(options);
        });
      })
      .then((sub) => {
        api.post("subs", { id: $user.id, sub: sub });
      });
  };

  if (typeof window != "undefined") {
    if (navigator && navigator.serviceWorker && $user) {
      getSub();
    }
  }
  */
