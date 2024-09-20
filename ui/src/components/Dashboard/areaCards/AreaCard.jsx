import PropTypes from "prop-types";
import CountUp from "react-countup";

const AreaCard = ({ colors, percentFillValue, cardInfo: { title, value, text } }) => {
  const filledValue = percentFillValue * 3.6; // Otimização do cálculo
  const remainedValue = 360 - filledValue;

  return (
    <div className="area-card">
      <div className="area-card-info">
        <h5 className="info-title">{title}</h5>

        {/* Contagem animada usando react-countup */}
        <div className="info-value">
          <CountUp end={parseFloat(value.replace(/[^\d.-]/g, ""))} duration={2.5} separator="," />
        </div>
        <p className="info-text">{text}</p>
      </div>
      <div className="area-card-chart">
        {/* Sua lógica de gráfico ou chart */}
      </div>
    </div>
  );
};

AreaCard.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  percentFillValue: PropTypes.number.isRequired,
  cardInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default AreaCard;
