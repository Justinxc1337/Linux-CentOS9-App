<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$heartbeat_file = '/var/www/html/statustracker/heartbeat.txt';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (file_put_contents($heartbeat_file, time()) !== false) {
        echo "Heartbeat received successfully.";
    } else {
        echo "Failed to write heartbeat.";
    }
} else {
    echo "Invalid request method.";
}