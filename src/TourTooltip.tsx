import { MouseEventHandler } from "react";

type TooltipFunctionProps = {
  "aria-label": string;
  "data-action": string;
  onClick: MouseEventHandler<HTMLElement>;
  role: string;
  title: string;
};

export function TourTooltip({
  step,
  primaryProps,
  skipProps,
}: {
  continuous: boolean;
  index: number;
  primaryProps: TooltipFunctionProps;
  skipProps: TooltipFunctionProps;
  step: object;
}) {
  const { onClick: next } = primaryProps;
  const { onClick: skip } = skipProps;

  return (
    <div
      className={
        "bg-white p-3 rounded-3xl max-w-[380px] flex flex-col space-y-2"
      }
    >
      <div className={"flex flex-col p-3"}>
        <span className={"text-xs font-semibold text-blue-600 mb-1"}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {step.title}
        </span>
        <span className={"text-[14px] font-medium text-slate-900"}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {step.content}
        </span>
      </div>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {step.hideFooter ? null : (
        <div className={"flex items-center justify-between"}>
          <div
            onClick={skip}
            className={
              "cursor-pointer hover:text-slate-900 text-xs font-semibold text-slate-500 hover:bg-slate-100 p-3 px-4 rounded-xl transition"
            }
          >
            skip
          </div>

          <div
            onClick={next}
            className={
              "cursor-pointer hover:text-white text-xs font-semibold text-blue-900 hover:bg-blue-600 bg-blue-100 p-3 px-4 rounded-xl transition"
            }
          >
            next
          </div>
        </div>
      )}
    </div>
  );
}
