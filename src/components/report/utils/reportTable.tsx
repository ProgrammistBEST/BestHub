import React from "react";

const ReportTable = ({ data, totals }) => {
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <td>Модель</td>
          <td>Продано шт.</td>
          <td>Себестоимость проданного</td>
          <td>Возвраты шт.</td>
          <td>Себестоимость возврата</td>
          <td>Себестоимость</td>
          <td>К перечислению</td>
          <td>Налог 7%</td>
          <td>Прибыль окончательная</td>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td>{row.label}</td>
            <td>{row.sold}</td>
            <td>{row.soldPrice}</td>
            <td>{row.return}</td>
            <td>{row.returnPrice}</td>
            <td>{row.profit}</td>
            <td>{row.cashTransfer}</td>
            <td>{row.tax}</td>
            <td>{row.finalProfit}</td>
          </tr>
        ))}
        <tr className="table-warning">
          <td>
            <strong>Итого</strong>
          </td>
          <td>{totals.sumSold}</td>
          <td>{totals.sumSoldPrice}</td>
          <td>{totals.sumReturn}</td>
          <td>{totals.sumReturnPrice}</td>
          <td>{totals.sumProfit}</td>
          <td>{totals.sumCashTransfer}</td>
          <td>{totals.sumTax}</td>
          <td>{totals.sumFinalProfit}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ReportTable;