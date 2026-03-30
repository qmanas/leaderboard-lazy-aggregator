# 🚀 Leaderboard Lazy Aggregator

A Node.js utility for fast leaderboard rankings using materialized views. Designed to handle high-concurrency environments (1M+ updates) where calculating real-time rankings would be too expensive for standard SQL queries.

- ⚙️ **Materialized Views**: Uses a "Lazy Aggregation" strategy to update ranking segments incrementally.
- 🧪 **Scalable Design**: Optimized for multi-region leaderboard logic.
- 📦 **Database Support**: Built for MySQL and PostgreSQL (via Sequelize).

### Why "Lazy"?
Calculating the exact rank of every player on every score update is O(N). This aggregator uses a two-tier segment update strategy that reduces the complexity to O(1) for the end-user while updating the "Global Truth" asynchronously.

**Implementation Notes:**
- Written to solve high-load issues in multi-player gaming leaderboards.
- Includes logic for automated partitioning and cache invalidation.
