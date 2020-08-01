const headers = {
    'Content-Type': 'application/json'
};

const wait = (delay, retries) => {
    let i = 0;
    return (action) => {
        i++;
        if(i <= retries) {
            setTimeout(action, delay);
        }
    }
};

export const createPerformanceTestJob = async (url) => {
    const response = await fetch(`/api/add`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ url })
    });

    const { job_id } = await response.json();

    return job_id;
}

export const getPerformanceResultsByJobId = async (jobId) => {
    const response = await fetch(`/api/results?job=${jobId}`, {
        headers,
    });
    const performanceResults = await response.json();

    if (performanceResults.state.includes('TEST')) {
        return wait(2000, 5)(getPerformanceResultsByJobId.bind(null, jobId));
    }

    return performanceResults;
}

export const cloneWebsite = async  (url) => {
    const response = await fetch('/api/full', {
        method: 'POST',
        headers,
        body: JSON.stringify({ url })
    });

    const { new_url } = await response.json();
    return new_url;
}
