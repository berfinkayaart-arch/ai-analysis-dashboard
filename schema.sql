DROP TABLE IF EXISTS metrics;
CREATE TABLE metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prompt_or_code TEXT NOT NULL,
    execution_time_ms INTEGER NOT NULL,
    character_count INTEGER NOT NULL,
    status TEXT NOT NULL,
    edge_location TEXT,
    cache_status BOOLEAN NOT NULL DEFAULT 0,
    model TEXT,
    temperature REAL,
    test_mode TEXT,
    cost REAL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some dummy data for testing the UI initially
INSERT INTO metrics (prompt_or_code, execution_time_ms, character_count, status, edge_location, cache_status, model, temperature, test_mode, cost) VALUES
('SELECT * FROM users WHERE status = "active";', 45, 45, 'Optimized', 'IST', 1, 'GPT-4o', 0.1, 'Single', 0.000056),
('import pandas as pd; df = pd.read_csv("data.csv"); df.groupby("category").sum()', 1200, 80, 'Costly / Not Optimized', 'FRA', 0, 'Claude 3.5 Sonnet', 0.9, 'Single', 0.00006),
('Create a python script to scrape a website and save data to sqlite.', 340, 67, 'Optimized', 'AMS', 0, 'Llama 3', 0.7, 'A/B', 0.000017),
('Calculate Fibonacci sequence up to 1000 without memoization.', 4500, 60, 'Costly / Not Optimized', 'IST', 0, 'GPT-4o', 0.8, 'A/B', 0.000075),
('const add = (a, b) => a + b;', 2, 28, 'Optimized', 'LHR', 1, 'Claude 3.5 Sonnet', 0.2, 'Single', 0.000021);
