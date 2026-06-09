<?php
// Enable error display for debugging on Vercel deployment
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Forward Vercel requests to the normal Laravel public/index.php entry point.
require __DIR__ . '/../public/index.php';
