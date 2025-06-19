export const nameSalOpts = [
  {
    label: 'Mr',
    value: 'Mr'
  },
  {
    label: 'Mrs',
    value: 'Mrs'
  },
  {
    label: 'M/s',
    value: 'M/s'
  },
  {
    label: 'Miss',
    value: 'Miss'
  }
];

export const socialLinkOpts = [
  {
    label: 'Instagram',
    value: 'Instagram'
  },
  {
    label: 'Facebook',
    value: 'Facebook'
  },
  {
    label: 'LinkedIn',
    value: 'LinkedIn'
  },
  {
    label: 'YouTube',
    value: 'YouTube'
  }
];

export const CustomLoadingCellRenderer = () => (
  <div className="ag-custom-loading-cell" style={{ paddingLeft: '10px', lineHeight: '25px' }}>
    <i className="fas fa-spinner fa-pulse" />
    <span> Loading data...</span>
  </div>
);
