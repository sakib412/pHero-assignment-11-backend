export const config = {
    secrets: {
        jwt: process.env.ACCESS_TOKEN_SECRET || 'learneverything'
    },
    dbUrl: 'mongodb://localhost:27017/assignment11'
}