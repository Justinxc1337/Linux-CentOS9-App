<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $status = $_POST['status'];
    file_put_contents('/var/www/html/statustracker/status.txt', $status);
    echo "Status updated successfully.";
} else {
    echo "Invalid request.";
}
