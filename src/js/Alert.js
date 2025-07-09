import { convertToJson, renderListWithTemplate } from "./utils.mjs";

const alertElement = document.querySelector(".alert-list");

function alertTemplate(alert) {
    return `<p style="background: ${alert.background}; color: ${alert.color};">${alert.message}</p>`;
}


export default class Alert {
    construtor(alertPath, alertElement) {
        this.alertPath = alertPath;
    }

    async init(){
        const alertData = await fetch(`../json/alerts.json`);
        const alertList = await convertToJson(alertData);
        this.renderAlerts(alertList);
    }

    renderAlerts(alertList) {
        renderListWithTemplate(alertTemplate, alertElement, alertList);
    }

}
