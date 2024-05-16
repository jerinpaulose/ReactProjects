type ReportHandler = (data: {
  id: string;
  name: string;
  startTime: number;
  value: number;
}) => void;

declare module 'web-vitals' {
  export function getCLS(onPerfEntry: ReportHandler): void;
  export function getFID(onPerfEntry: ReportHandler): void;
  export function getFCP(onPerfEntry: ReportHandler): void;
  export function getLCP(onPerfEntry: ReportHandler): void;
  export function getTTFB(onPerfEntry: ReportHandler): void;
}

const reportWebVitals = (onPerfEntry: ReportHandler) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
