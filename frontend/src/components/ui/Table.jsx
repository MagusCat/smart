export function getTheme() {
  return {
    Table: `
      border: 2px solid #00000080;
      margin: 0rem 2rem;
    `,
    HeaderRow: `
        .th {
          border-bottom: 2px solid #000;
          padding: 0.25rem;
        }
      `,
    BaseCell: `
        &:not(:last-of-type) {
          border-right: 1px solid #a0a8ae;
        }

        text-align: center;
        padding: 0.2rem;
      `,
  };
}
