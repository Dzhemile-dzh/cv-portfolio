<?php

declare(strict_types=1);

namespace App\Data;

use App\Contracts\PortfolioRepositoryInterface;

final class InMemoryPortfolioRepository implements PortfolioRepositoryInterface
{
    /**
     * @return array<string, mixed>
     */
    public function profile(): array
    {
        return [
            'name' => 'Dzhemile Ahmed',
            'title' => 'Full-Stack Web Developer',
            'subtitle' => 'Data Science Enthusiast',
            'email' => 'dzhemile.ahmet@gmail.com',
            'phone' => '(+359) 895627511',
            'location' => 'Varna, Bulgaria',
            'photo' => '/profile.png',
            'about' => 'Experienced full-stack software engineer with over 7 years of experience in web development, specializing in PHP frameworks, JavaScript, and databases. Passionate about data science, eager to apply technical expertise in data analysis and machine learning to solve complex problems. Also teaching programming to children in grades 2-4 through Roblox and Minecraft Education. Seeking a challenging role in a dynamic organization to contribute with my skills and grow further.',
            'socials' => [
                ['name' => 'LinkedIn', 'url' => 'https://www.linkedin.com/in/dzhemile-ahmed-42icdi/', 'icon' => 'linkedin'],
                ['name' => 'GitHub', 'url' => 'https://github.com/Dzhemile-dzh', 'icon' => 'github'],
                ['name' => 'Tableau', 'url' => 'https://public.tableau.com/app/profile/dzhemile.ahmed5149/vizzes', 'icon' => 'tableau'],
            ],
            'languages' => [
                ['name' => 'Bulgarian', 'level' => 'Native'],
                ['name' => 'English', 'level' => 'B2'],
                ['name' => 'Turkish', 'level' => 'C2'],
            ],
            'hobbies' => ['Oil Painting', 'Chess'],
        ];
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function experience(): array
    {
        return [
            [
                'company' => 'Vero Digital Solutions',
                'type' => 'German Software Company',
                'role' => 'Full-Stack / Backend PHP Developer',
                'period' => '2025.01 - Present',
                'highlights' => [
                    'Develop and maintain a PHP 8.5 printout API that generates professional PDFs for construction industry clients (BauBuddy ecosystem).',
                    'Build and port printout routes with Twig/Latte templates, schema-driven document models, and multi-engine rendering (Playwright, wkhtmltopdf, DOCX).',
                    'Integrate external APIs via cURL (including parallel multi-calls), authentication principals, and hierarchical document/schema fetching.',
                    'Uphold high code quality with PHPStan, Rector, Mago, Stylelint, PHPUnit, and Docker-based local/CI workflows.',
                ],
                'technologies' => ['PHP 8.5', 'Twig', 'Latte', 'Playwright', 'Docker', 'PHPStan', 'GitLab CI', 'PSL'],
            ],
            [
                'company' => 'INDEAVR',
                'type' => 'Outsourcing Company',
                'role' => 'Backend Web Developer with PHP',
                'period' => '2023.08 - 2025.01',
                'highlights' => [
                    'Develop and maintain Drupal modules and themes using PHP 8.',
                    'Utilize Pantheon and TFS for version control and ensure high-quality code with SonarCloud.',
                    'Collaborate in cross-functional teams to deliver clean, maintainable code.',
                ],
                'technologies' => ['Drupal', 'PHP', 'Pantheon', 'SonarCloud', 'TFS'],
            ],
            [
                'company' => 'MTG Dolphin',
                'type' => 'Shipbuilding Company',
                'role' => 'Fullstack Web Developer',
                'period' => '2023.02 - 2023.08',
                'highlights' => [
                    'Handled both front-end and back-end development for shipbuilding company portal.',
                    'Improved the efficiency of the internal portal using YII2, MySQL, and JavaScript.',
                ],
                'technologies' => ['YII2', 'MySQL', 'JavaScript', 'PHP'],
            ],
            [
                'company' => 'Mobile Wave Solutions',
                'type' => 'Outsourcing Company',
                'role' => 'Software Developer',
                'period' => '2021.04 - 2022.12',
                'highlights' => [
                    'Created and updated websites in the gambling industry using PHP Phalcon framework.',
                    'Estimation and implementation of tasks; part of code review and estimation process.',
                    'Writing unit and end-to-end tests; Agile methodology on Jira.',
                    'Experience with React, Swagger documentation, and Twig templating.',
                ],
                'technologies' => ['PHP', 'Phalcon', 'React', 'MySQL', 'Twig', 'Swagger', 'Jira'],
            ],
            [
                'company' => 'Gambling Insider',
                'type' => 'Business Press for Gambling Industry',
                'role' => 'Backend Web Developer',
                'period' => '2019.03 - 2021.04',
                'highlights' => [
                    'Developed and maintained backend code using OOP in PHP, MVC architecture, and JavaScript.',
                    'Used Smarty templates; created CRM systems for business needs.',
                    'Created database structure schemas and design using data modeler.',
                    'Wrote clean, efficient, and well-documented code for maintainability and scalability.',
                ],
                'technologies' => ['PHP', 'MVC', 'JavaScript', 'Smarty', 'MySQL'],
            ],
            [
                'company' => 'Broadcom',
                'type' => 'Semiconductor Manufacturing Company',
                'role' => 'Software Expert in Programming and Design',
                'period' => '2018.11 - 2019.01',
                'highlights' => [
                    'Programming and design of analog and digital semiconductor circuits.',
                    'Worked extensively with Verilog/VHDL.',
                ],
                'technologies' => ['Verilog', 'VHDL'],
            ],
        ];
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function projects(): array
    {
        return [
            [
                'id' => 'api-printout-vero',
                'title' => 'API Printout Platform (Vero / BauBuddy)',
                'description' => 'Enterprise PHP 8.5 printout service that turns construction-site documentation into branded PDFs. Supports multiple render engines, schema-driven forms, and dozens of client-specific printout routes.',
                'longDescription' => 'Built and maintained printout routes for German construction/scaffolding clients: data fetching from BauBuddy APIs, typed route configs, Latte/Twig HTML templates, Playwright and legacy wkhtmltopdf PDF generation, plus DOCX conversion. Strong focus on static analysis (PHPStan), Docker, GitLab CI, and parallel API calls for performance.',
                'technologies' => ['PHP 8.5', 'Latte', 'Twig', 'Playwright', 'Docker', 'PHPStan', 'GitLab CI', 'PSL'],
                'category' => 'Full-Stack',
                'links' => [],
                'featured' => true,
            ],
            [
                'id' => 'drupal-enterprise-modules',
                'title' => 'Enterprise Drupal Module Suite',
                'description' => 'Custom Drupal modules and themes for enterprise clients, built with PHP 8 and modern Drupal APIs. Includes content workflows, REST integrations, and Pantheon-optimized deployment pipelines with SonarCloud quality gates.',
                'longDescription' => 'Led backend development of reusable Drupal modules for an outsourcing client. Implemented custom entity types, migration tools, and theme layer components. Integrated CI/CD with Pantheon and enforced code quality through SonarCloud static analysis.',
                'technologies' => ['Drupal', 'PHP 8', 'Pantheon', 'SonarCloud', 'Twig'],
                'category' => 'Backend',
                'links' => [],
                'featured' => true,
            ],
            [
                'id' => 'shipbuilding-portal',
                'title' => 'Shipbuilding Internal Portal',
                'description' => 'Full-stack internal portal for a shipbuilding company. Rebuilt legacy workflows with YII2 MVC, optimized MySQL queries, and interactive JavaScript dashboards that reduced manual data entry by 40%.',
                'longDescription' => 'Delivered end-to-end features for document management, project tracking, and reporting. Refactored database schema for performance, introduced role-based access control, and built responsive UI components for field teams.',
                'technologies' => ['YII2', 'MySQL', 'JavaScript', 'PHP', 'Bootstrap'],
                'category' => 'Full-Stack',
                'links' => [],
                'featured' => true,
            ],
            [
                'id' => 'gaming-platform-api',
                'title' => 'Gaming Platform API & Frontend',
                'description' => 'High-traffic gambling industry platform built on PHP Phalcon with React SPA frontend. Swagger-documented REST API, Twig views, comprehensive unit and E2E test coverage under Agile delivery.',
                'longDescription' => 'Contributed to estimation, implementation, and code review cycles. Built React components for player dashboards, integrated Phalcon API endpoints, and maintained Swagger documentation for cross-team collaboration.',
                'technologies' => ['Phalcon', 'React', 'MySQL', 'Twig', 'Swagger', 'Jest'],
                'category' => 'Full-Stack',
                'links' => [],
                'featured' => true,
            ],
            [
                'id' => 'crm-publishing-system',
                'title' => 'Publishing CRM System',
                'description' => 'Custom CRM for a gambling industry media company. PHP MVC backend with Smarty templates, automated lead pipelines, and data modeler-driven schema design for scalable reporting.',
                'longDescription' => 'Designed database schemas, built admin interfaces, and integrated third-party APIs for marketing automation. Focused on clean OOP architecture and thorough inline documentation.',
                'technologies' => ['PHP', 'MVC', 'Smarty', 'JavaScript', 'MySQL'],
                'category' => 'Backend',
                'links' => [],
                'featured' => false,
            ],
            [
                'id' => 'data-viz-dashboard',
                'title' => 'Data Visualization Dashboard',
                'description' => 'Interactive Tableau dashboards for business analytics. Combines MySQL data pipelines with visual storytelling for stakeholder decision-making in web development and data science contexts.',
                'longDescription' => 'Personal data science project showcasing Tableau skills alongside SQL analytics. Explores portfolio metrics, technology trends, and interactive filters for exploratory analysis.',
                'technologies' => ['Tableau', 'MySQL', 'Python', 'Excel'],
                'category' => 'Data Science',
                'links' => [
                    ['label' => 'Tableau Public', 'url' => 'https://public.tableau.com/app/profile/dzhemile.ahmed5149/vizzes'],
                ],
                'featured' => true,
            ],
            [
                'id' => 'portfolio-website',
                'title' => 'This Portfolio Website',
                'description' => 'Modern CV portfolio built with React 19 and PHP 8.5 API. Features SEO optimization, JSON-LD structured data, responsive design, and a RESTful backend serving portfolio content.',
                'longDescription' => 'Demonstrates full-stack capabilities with a decoupled architecture: React SPA frontend with Framer Motion animations, PHP backend with PSR-4 autoloading, and production-ready SEO including sitemap and Open Graph meta tags.',
                'technologies' => ['React', 'PHP 8.5', 'TypeScript', 'Tailwind CSS', 'Vite'],
                'category' => 'Full-Stack',
                'links' => [
                    ['label' => 'Source Code', 'url' => 'https://github.com/Dzhemile-dzh/cv-portfolio'],
                ],
                'featured' => true,
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function teaching(): array
    {
        return [
            'role' => 'Programming Instructor',
            'audience' => 'Children, Grades 2-4',
            'description' => 'Teaching programming fundamentals to young learners through game-based education. Sessions focus on logic, creativity, and problem-solving using platforms kids already love.',
            'highlights' => [
                'Design and deliver age-appropriate programming lessons for 2nd to 4th grade students.',
                'Use Roblox Studio to introduce scripting, game design, and computational thinking.',
                'Use Minecraft Education Edition for block-based coding, collaboration, and STEM activities.',
                'Adapt technical concepts into fun, hands-on exercises that keep children engaged.',
            ],
            'technologies' => ['Roblox Studio', 'Minecraft Education Edition', 'Lua', 'Block-based Programming'],
        ];
    }

    /**
     * @return array<string, list<string>>
     */
    public function skills(): array
    {
        return [
            'Back-End' => [
                'PHP', 'PHP 8.5', 'YII2', 'Phalcon', 'Symfony', 'Drupal', 'Django', 'Python', 'Latte', 'Twig',
            ],
            'Front-End' => [
                'JavaScript', 'React', 'CSS', 'SASS', 'Twig', 'Bootstrap', 'Playwright',
            ],
            'Databases' => [
                'MySQL', 'PostgreSQL', 'MongoDB', 'Oracle',
            ],
            'Version Control' => [
                'GitLab', 'Azure DevOps', 'TFS', 'Git',
            ],
            'Data Science' => [
                'Tableau', 'Data Modeler', 'Excel', 'Python',
            ],
            'DevOps & Tools' => [
                'Docker', 'Jenkins', 'Pantheon', 'SonarCloud', 'Swagger', 'GitLab CI', 'PHPStan', 'Rector',
            ],
            'Teaching & Education Tech' => [
                'Roblox Studio', 'Minecraft Education Edition', 'Lua', 'STEM Education',
            ],
        ];
    }

    /**
     * @return list<array<string, string>>
     */
    public function education(): array
    {
        return [
            [
                'institution' => 'Technical University of Varna',
                'degree' => "Master's Degree, Software Engineering",
                'period' => '2019 - Present',
            ],
            [
                'institution' => 'Technical University of Varna',
                'degree' => "Bachelor's Degree, Software and Internet Technology",
                'period' => '2014 - 2018',
            ],
            [
                'institution' => 'Professional High-School of Economics, Varna',
                'degree' => 'Copartner in Small and Medium Business',
                'period' => '2010 - 2014',
            ],
        ];
    }

    /**
     * @return list<array<string, string>>
     */
    public function certifications(): array
    {
        return [
            [
                'name' => 'Tableau for Data Visualization',
                'issuer' => 'Analyst Builder',
                'url' => 'https://www.analystbuilder.com/achievements/verify/KXC0TGGHX5?r=rjknME2fHZAU107OJBxk9RSCx',
            ],
            [
                'name' => 'MySQL for Data Analytics',
                'issuer' => 'Analyst Builder',
                'url' => 'https://www.analystbuilder.com/achievements/verify/2CAKHDN5XT?r=ftNP0jBdW9JZg4xmrgz6Pmhpo',
            ],
            [
                'name' => 'Data Fundamentals',
                'issuer' => 'IBM',
                'url' => 'https://www.credly.com/badges/8a3adec8-3cee-45ed-8185-2e4da1a40d7f/public_url',
            ],
            [
                'name' => 'Web Development Fundamentals',
                'issuer' => 'IBM',
                'url' => 'https://www.credly.com/badges/b59c1fab-1d3a-4d27-90be-cbbf43a7d30c/public_url',
            ],
            [
                'name' => 'CS50\'s Introduction to Programming with Python',
                'issuer' => 'Harvard University',
                'url' => 'https://certificates.cs50.io/1030dd02-9b3f-43ee-9899-a7471117c289.pdf?size=letter',
            ],
            [
                'name' => 'Programming Basics with Python',
                'issuer' => 'SoftUni',
                'url' => 'https://softuni.bg/certificates/details/100518/9451b099',
            ],
            [
                'name' => 'JavaScript OOP',
                'issuer' => 'Code with Mosh',
                'url' => '',
            ],
            [
                'name' => 'Mastering React',
                'issuer' => 'Code with Mosh',
                'url' => '',
            ],
            [
                'name' => 'Database Foundation',
                'issuer' => 'Oracle',
                'url' => '',
            ],
        ];
    }

    /**
     * @return array<string, mixed>|null
     */
    public function findProject(string $id): ?array
    {
        foreach ($this->projects() as $project) {
            if ($project['id'] === $id) {
                return $project;
            }
        }

        return null;
    }

    /**
     * @return array<string, mixed>
     */
    public function all(): array
    {
        return [
            'profile' => $this->profile(),
            'experience' => $this->experience(),
            'projects' => $this->projects(),
            'skills' => $this->skills(),
            'education' => $this->education(),
            'certifications' => $this->certifications(),
            'teaching' => $this->teaching(),
        ];
    }
}
