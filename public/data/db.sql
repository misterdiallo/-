-- Create Employees table
CREATE TABLE Employees (
id INT AUTO_INCREMENT PRIMARY KEY,
Name VARCHAR(100),
Employee_ID VARCHAR(20) UNIQUE,
Application_Status VARCHAR(50),
Affiliated_Department VARCHAR(100),
Referring_Unit VARCHAR(100),
Current_Professional_Technical_Position VARCHAR(100),
Initial_Appointment_Time DATE,
Intended_Professional_Title_Series VARCHAR(100),
Intended_Position_Type VARCHAR(100),
Competition_Method VARCHAR(50)
);

-- Create Assessments table
CREATE TABLE Assessments (
id INT AUTO_INCREMENT PRIMARY KEY,
College VARCHAR(100),
Employee_ID VARCHAR(20),
Name VARCHAR(100),
Assessment_Score DECIMAL(5, 2),
`Rank` INT,  -- Escaping Rank using backticks
Evaluation_Grade VARCHAR(50),
Semester VARCHAR(20),
Remarks VARCHAR(255),
Explanation VARCHAR(255)
);

-- Create College table
CREATE TABLE College (
id INT AUTO_INCREMENT PRIMARY KEY,
College_Name VARCHAR(100) UNIQUE,
College_Count INT
);
