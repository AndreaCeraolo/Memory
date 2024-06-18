<?php
$dbServer = '127.0.0.1';
$dbUser = 'root';
$dbPassword = '';
$dbDatabase = 'memory';

$link = mysqli_connect($dbServer, $dbUser, $dbPassword, $dbDatabase);

$player = $_GET['player'];
$score = $_GET['score'];

$query = "SELECT id FROM memory_scores WHERE player = '$player'";

$res = mysqli_query($link, $query);

if (mysqli_num_rows($res) == 0) {
    $query = "INSERT INTO memory_scores(player, score) VALUES ('$player', $score)";
    mysqli_query($link, $query);
} else {
    $row = mysqli_fetch_assoc($res);
    if ($row['score'] > $score) {
        $query = "UPDATE memory_scores SET score = $score WHERE player = '$player'";
        mysqli_query($link, $query);
    }
}

$query = "SELECT * FROM memory_scores ORDER BY score ASC";

$res = mysqli_query($link, $query);

?>
<table>
    <tr>
        <th>#</th>
        <th>Player</th>
        <th>Score</th>
    </tr>
    <?php
    while ($row = mysqli_fetch_assoc($res)) {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . $row['player'] . "</td>";
        echo "<td>" . $row['score'] . "</td>";
        echo "</tr>";
    }
    ?>
</table>