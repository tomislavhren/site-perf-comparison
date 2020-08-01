const headers = {
    'Content-Type': 'application/json'
};

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

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
        await wait(2000);
        return await getPerformanceResultsByJobId(jobId);
    } else {
        return performanceResults;
    }
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
