import { getProjects } from './src/lib/content/projects.js';

async function test() {
    try {
        const projects = await getProjects();
        console.log('Projects count:', projects.length);
        if (projects.length > 0) {
            console.log('First project:', projects[0]);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

test();