-- Create Employees table

CREATE TABLE Employees ( id INT AUTO_INCREMENT PRIMARY KEY,
                                                       Name VARCHAR(100),
                                                            Employee_ID VARCHAR(20) UNIQUE,
                                                                                    Application_Status VARCHAR(50),
                                                                                                       Affiliated_Department VARCHAR(100),
                                                                                                                             Referring_Unit VARCHAR(100),
                                                                                                                                            Current_Professional_Technical_Position VARCHAR(100),
                                                                                                                                                                                    Initial_Appointment_Time DATE, Intended_Professional_Title_Series VARCHAR(100),
                                                                                                                                                                                                                                                      Intended_Position_Type VARCHAR(100),
                                                                                                                                                                                                                                                                             Competition_Method VARCHAR(50));

-- Populate Employees table with sample data

INSERT INTO Employees (Name, Employee_ID, Application_Status, Affiliated_Department, Referring_Unit, Current_Professional_Technical_Position, Initial_Appointment_Time, Intended_Professional_Title_Series, Intended_Position_Type, Competition_Method)
VALUES ('张三',
        'E001',
        '申报中',
        '信息科学与工程学院',
        '信息科学与工程学院',
        '教授',
        '2020-01-15',
        '副教授',
        '教授',
        '竞聘'), ('李四',
                'E002',
                '已申报',
                '商学院',
                '商学院',
                '副教授',
                '2018-09-20',
                '教授',
                '副教授',
                '推荐');

-- Create Assessments table

CREATE TABLE Assessments ( id INT AUTO_INCREMENT PRIMARY KEY,
                                                         College VARCHAR(100),
                                                                 Employee_ID VARCHAR(20),
                                                                             Name VARCHAR(100),
                                                                                  Assessment_Score DECIMAL(5, 2),
                                                                                                   Rank INT, Evaluation_Grade VARCHAR(50),
                                                                                                                              Semester VARCHAR(20),
                                                                                                                                       Remarks VARCHAR(255),
                                                                                                                                               Explanation VARCHAR(255));

-- Populate Assessments table with sample data

INSERT INTO Assessments (College, Employee_ID, Name, Assessment_Score, Rank, Evaluation_Grade, Semester, Remarks, Explanation)
VALUES ('信息科学与工程学院',
        'E001',
        '张三',
        85.5,
        1,
        '优秀',
        '2024春季',
        '无',
        '无'), ('商学院',
               'E002',
               '李四',
               78.9,
               3,
               '良好',
               '2024春季',
               '无',
               '无');

-- Create College table

CREATE TABLE College ( id INT AUTO_INCREMENT PRIMARY KEY,
                                                     College_Name VARCHAR(100) UNIQUE,
                                                                               College_Count INT);

-- Populate College table with sample data

INSERT INTO College (College_Name, College_Count)
VALUES ('沂水校区',
        137), ('费县校区',
               125), ('外国语学院',
                      122), ('马克思主义学院',
                             106), ('教育学院',
                                    96), ('信息科学与工程学院',
                                          96), ('医学院',
                                                90), ('化学化工学院',
                                                      83), ('商学院',
                                                            80), ('体育与健康学院',
                                                                  80), ('农林科学学院',
                                                                        79), ('数学与统计学院',
                                                                              76), ('自动化与电气工程学院',
                                                                                    76), ('资源环境学院',
                                                                                          74), ('机械与车辆工程学院',
                                                                                                72), ('材料科学与工程学院',
                                                                                                      69), ('生命科学学院',
                                                                                                            69), ('美术学院',
                                                                                                                  68), ('音乐学院',
                                                                                                                        67), ('物理与电子工程学院',
                                                                                                                              64), ('传媒学院',
                                                                                                                                    56), ('法学院',
                                                                                                                                          53), ('土木工程与建筑学院',
                                                                                                                                                53), ('物流学院',
                                                                                                                                                      50), ('文学院',
                                                                                                                                                            47), ('历史文化学院',
                                                                                                                                                                  44), ('国际生物资源应用学院',
                                                                                                                                                                        14), ('地质与古生物研究所',
                                                                                                                                                                              8);

