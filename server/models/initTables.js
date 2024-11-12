export const initUserTable = async (db) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('user', 'admin') DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  await db.query(createTableQuery);
};

export const initImageTable = async (db) => {
  await db.query(`
   CREATE TABLE IF NOT EXISTS Images (
      image_id INT AUTO_INCREMENT PRIMARY KEY,                   
      user_id INT,                                       
      img_url VARCHAR(255) NOT NULL,                       
      text_result TEXT,                                   
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,      
      FOREIGN KEY (user_id) REFERENCES Users(user_id)           
    )
  `);
  console.log("Image table checked/created successfully.");
};

export const initAPIUsageTable = async (db) => {
  await db.query(`
   CREATE TABLE API_Usage (
      id INT AUTO_INCREMENT PRIMARY KEY,               
      user_id INT NOT NULL,                            
      calls INT DEFAULT 0,                             
      last_call TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   
      FOREIGN KEY (user_id) REFERENCES Users(user_id)
    )
  `);
  console.log("API usage table checked/created successfully.");
};
