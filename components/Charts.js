import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title} from 'chart.js';
import { generateLanguagesChart, generateReposChart } from "../utils/chart";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function Charts({languages, repos}) {

    const {dataRepos, optionsRepos} = generateReposChart(repos);
    const {dataLang, optionsLang} = generateLanguagesChart(languages);

    return (
        <div className="charts">
            <div className="chart">
                <span className="chart-title">Top Languages</span>
                <Pie className="pie" options={optionsLang} data={dataLang}/>
            </div>

            <div className="chart">
                <span className="chart-title">Most Starred</span>
                <Bar style={{marginTop: "10px"}} className="bar" options={optionsRepos} data={dataRepos}/>
            </div>
        </div>
    );
}