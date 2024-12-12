import { Chart as ChartJS, TooltipModel, ChartTypeRegistry } from "chart.js";
import { getCurrencySymbol } from "../../lib/getCurrencySymbol";
import { Currencies } from "../../api/types";

const getOrCreateTooltip = (chart: ChartJS) => {
  let tooltipEl = chart.canvas.parentNode?.querySelector("div");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.style.background = "rgba(0, 0, 0, 0.85)";
    tooltipEl.style.borderRadius = "5px";
    tooltipEl.style.color = "white";
    tooltipEl.style.fontSize = "14px";
    tooltipEl.style.opacity = "1";
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.transform = "translate(0%, -50%)";
    // tooltipEl.style.transform = "translate(-50%, -50%)";
    tooltipEl.style.transition = "all .1s ease";

    const table = document.createElement("table");
    table.style.margin = "0px";

    tooltipEl.appendChild(table);
    chart.canvas.parentNode?.appendChild(tooltipEl);
  }

  return tooltipEl;
};

type ContextType = {
  chart: ChartJS;
  tooltip: TooltipModel<keyof ChartTypeRegistry>;
};

export const createExternalTooltipHandler =
  (currency: Currencies) => (context: ContextType) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = "0";
      return;
    }

    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b) => b.lines);

      const tableHead = document.createElement("thead");

      titleLines.forEach((title) => {
        const tr = document.createElement("tr");
        tr.style.borderWidth = "0";

        const th = document.createElement("th");
        th.style.borderWidth = "0";
        const text = document.createTextNode(title);

        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });

      const tableBody = document.createElement("tbody");
      bodyLines.forEach((body, i) => {
        const colors = tooltip.labelColors[i];

        const span = document.createElement("span");
        span.style.background = colors.backgroundColor as string;
        span.style.borderColor = colors.borderColor as string;
        span.style.borderWidth = "2px";
        span.style.marginRight = "10px";
        span.style.height = "10px";
        span.style.width = "10px";
        span.style.display = "inline-block";

        const tr = document.createElement("tr");
        tr.style.backgroundColor = "inherit";
        tr.style.borderWidth = "0";

        const td = document.createElement("td");
        td.style.borderWidth = "0";
        td.style.color = "white";
        td.style.fontWeight = "bold";

        const itemText = body[0];
        const texts = itemText.split(":");
        const _text = texts[0] + ": " + getCurrencySymbol(currency) + texts[1];
        const text = document.createTextNode(_text);

        // const text = document.createTextNode(body);

        td.appendChild(span);
        td.appendChild(text);
        tr.appendChild(td);
        tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector("table");

      // Remove old children
      while (tableRoot?.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot?.appendChild(tableHead);
      tableRoot?.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    const {
      chartArea: { left, right },
    } = chart;
    const xAxisLength = right - left;
    const xShiftLeft = -140;
    const xShiftRight = 10;

    // Display, position, and set styles for font
    if (tooltip.caretX > left + xAxisLength * 0.5) {
      tooltipEl.style.left = positionX + tooltip.caretX + xShiftLeft + "px";
    } else {
      tooltipEl.style.left = positionX + tooltip.caretX + xShiftRight + "px";
    }
    tooltipEl.style.top = positionY + tooltip.caretY + "px";
    tooltipEl.style.opacity = "1";
    // @ts-ignore
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding =
      tooltip.options.padding + "px " + tooltip.options.padding + "px";
  };
