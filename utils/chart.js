export function generateLanguagesChart(languages) {

    const refactoredLang = languages.slice(0, 7);

    const options = {
        plugins: {
            legend: {
                position: "right",
            },
        }
    };

    const data = {
        labels: refactoredLang.map((language) => language.label),
        datasets: [
            {
                data: refactoredLang.map((language) => language.value),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(50, 220, 50, 0.7)',
                    'rgba(255, 51, 51, 0.7)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(80, 205, 80, 1)',
                    'rgba(255, 51, 51, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return {
        dataLang: data,
        optionsLang: options
    }
}

export function generateReposChart(repos) {

    const topRepos = getTopRepos(repos, 5, "stargazers_count");

    const options = {
        scales: {
            x: {
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    font: {
                        size: 11,
                    }
                }
            }
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            
        }
    };

    const data = {
        labels: topRepos.map((repo) => repo.name),
        datasets: [
            {
                data: topRepos.map((repo) => repo.stargazers_count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return {
        dataRepos: data,
        optionsRepos: options
    }
}

export function getTopRepos(repos, max, property) {

    const topRepos = repos
        .filter(repo => !repo.fork)
        .sort((a, b) => b[property] - a[property])
        .slice(0, max);

    return topRepos;
}