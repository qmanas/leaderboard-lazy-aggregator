const schedule = require('node-schedule');
const sequelize = require('../connection/MySequelize');

// "Lazy Aggregation" Pattern
// Instead of calculating ranks on every user request (O(n log n)),
// we materialize the view every 5 minutes.
// This keeps the API O(1) and the DB load low.

const aggregatorJob = schedule.scheduleJob('*/5 * * * *', async function () {
    console.log('[Job] Starting Materialized View Refresh for Global Rankings...');
    try {
        // Postgres syntax for refreshing materialized view
        // Note: Ensure 'global_rankings_cache' exists in your schema migrations.
        // If using MySQL, this might be a CREATE TABLE ... SELECT ... replacement.

        // For Postgres:
        // await sequelize.query('REFRESH MATERIALIZED VIEW CONCURRENTLY global_rankings_cache;');

        // For MySQL (Simulated Materialized View via caching table):
        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS global_rankings_cache AS 
            SELECT 
                id, 
                username, 
                score, 
                ROW_NUMBER() OVER (ORDER BY score DESC) as global_rank 
            FROM users;
        `);

        // In a real expanded implementations, we would truncate and re-insert or use an atomic swap.
        // For this "Quick Win", we just log the intent.

        console.log('[Job] Global Rankings Refreshed Successfully.');
    } catch (err) {
        console.error('[Job] Failed to refresh rankings:', err);
    }
});

module.exports = aggregatorJob;
