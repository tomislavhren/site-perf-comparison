import { wait } from './utils';

const headers = {
    'Content-Type': 'application/json'
};

const sitePerformanceApiPrefix = process.env.NODE_ENV === 'development' ? '' : 'http://64.227.57.174';
const clonerApiPrefix = process.env.NODE_ENV === 'development' ? '' : 'http://178.128.158.164';

export const createPerformanceTestJob = async (url) => {
    const response = await fetch(`${sitePerformanceApiPrefix}/api/add`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ url })
    });

    const { job_id } = await response.json();

    return job_id;
}

export const getPerformanceResultsByJobId = async (jobId) => {
    const response = await fetch(`${sitePerformanceApiPrefix}/api/results?job=${jobId}`, {
        headers,
    });
    const performanceResults = await response.json();

    if (performanceResults.state !== 'SUCCESS' || !performanceResults.output) {
        await wait(2);
        return await getPerformanceResultsByJobId(jobId);
    } else {
        return performanceResults;
    }
}

export const cloneWebsite = async  (url) => {
    const response = await fetch(`${clonerApiPrefix}/api/full`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ url })
    });

    const { new_url } = await response.json();
    return new_url;
}
