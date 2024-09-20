import React, { PureComponent } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

class AreaBarChart extends PureComponent {
  state = {
    combinedData: [],
  };

  async componentDidMount() {
    await this.fetchData();
  }

  fetchData = async () => {
    try {
      const barResponse = await axios.get('http://localhost:3000/api/data-analysis/relacao-cancer-mama-renda');
      const areaResponse = await axios.get('http://localhost:3000/api/data-analysis/distribution/race');
      const lineResponse = await axios.get('http://localhost:3000/api/data-analysis/distribution/ageGroup');

      const barData = barResponse.data || [];
      const areaData = areaResponse.data || [];
      const lineData = lineResponse.data || [];

      // Combine all data into one array, aligning by index
      const combinedData = barData.map((barItem, index) => ({
        renda_familiar: barItem.renda_familiar,
        total_casos_bar: barItem.total_casos,
        raca: areaData[index] ? areaData[index].raca : '',
        total_raca: areaData[index] ? areaData[index].total : 0,
        faixa_etaria: lineData[index] ? lineData[index].faixa_etaria : '',
        total_faixa: lineData[index] ? lineData[index].total : 0,
      }));

      this.setState({ combinedData });
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  render() {
    const { combinedData } = this.state;

    return (
      <div style={{ backgroundColor: 'white' }}>
        <h4 style={{padding:"20px"}}>RENDA FAMILIAR, RAÇA E FAIXA ETÁRIA</h4>

        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={combinedData}
            margin={{ top: 20, right: 80, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="renda_familiar" label={{ value: '', position: 'insideBottomRight', offset: 0 }} />
            <YAxis label={{ value: 'Total', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />

            <Area type="monotone" dataKey="total_raca" fill="#ff7ba5" stroke="#ff7ba5" name="Total por Raça" />
            <Bar dataKey="total_casos_bar" barSize={20} fill="#413ea0" name="Total Casos (Renda Familiar)" />
            <Line type="monotone" dataKey="total_faixa" stroke="#8884d8" name="Total por Faixa Etária" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default AreaBarChart;
