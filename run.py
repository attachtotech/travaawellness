import os
import sqlite3

# Create database directory if it doesn't exist
os.makedirs('database', exist_ok=True)

# Test database connection
try:
    conn = sqlite3.connect('database/site.db')
    print("Database connection successful!")
    
    # Test creating a simple table
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS test_table (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        )
    ''')
    conn.commit()
    print("Table creation successful!")
    
    cursor.execute("INSERT INTO test_table (name) VALUES ('Test Entry')")
    conn.commit()
    print("Data insertion successful!")
    
    conn.close()
    print("All database tests passed!")
    
except Exception as e:
    print(f"Error: {e}")