import { importPois } from './api.js';

export function uploadJson(file) {
    if (file.name.endsWith(".zip")) {
        const formData = new FormData();
        formData.append('file', file); 
        importPois(formData).then((success) => {
          window.dispatchEvent(
            new CustomEvent('custom-upload-control-from-zip', { detail: success })
          );
        }).catch((err) => {
          console.error(err);
        });
      } else {
        const reader = new FileReader();
        reader.onload = function (event) {
          const content = JSON.parse(event.target.result);
          window.dispatchEvent(
            new CustomEvent('custom-upload-control', { detail: content })
          );
        };
        reader.readAsText(file);
      }
}