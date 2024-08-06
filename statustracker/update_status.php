<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$status_file = '/var/www/html/statustracker/status.txt';
$heartbeat_file = '/var/www/html/statustracker/heartbeat.txt';
$heartbeat_timeout = 120; // 2 minutes

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $status = $_POST['status'];
    if ($status === 'online' || $status === 'offline') {
        if (file_put_contents($status_file, $status) !== false) {
            echo "Status updated successfully.";
        } else {
            echo "Failed to write to file.";
        }
    } else {
        echo "Invalid status value.";
    }
} else {
    // Check if the last heartbeat was received within the timeout interval
    if (file_exists($heartbeat_file)) {
        $last_heartbeat = (int)file_get_contents($heartbeat_file);
        $current_time = time();
        if (($current_time - $last_heartbeat) > $heartbeat_timeout) {
            file_put_contents($status_file, 'offline');
            echo "Status updated to offline due to missing heartbeat.";
        } else {
            echo "Status remains online.";
        }
    } else {
        file_put_contents($status_file, 'offline');
        echo "Status updated to offline due to missing heartbeat file.";
    }
}