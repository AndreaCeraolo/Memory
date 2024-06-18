<?php
$dbServer = '127.0.0.1';
$dbUser = 'root';
$dbPassword = '';
$dbDatabase = 'memory';

$link = mysqli_connect($dbServer, $dbUser, $dbPassword, $dbDatabase);

$query = "SELECT * FROM memory_scores ORDER BY score ASC";

$res = mysqli_query($link, $query);

?>
<table id="score">
    <tr>
        <th>Giocatori</th>
        <th>Tentativi</th>
    </tr>
    <?php
    if (mysqli_num_rows($res) == 0) {
        echo "<tr><td id='noScores' colspan='3'>No scores yet!</td></tr>";
    } else {
        while ($row = mysqli_fetch_assoc($res)) {
            echo "<tr>";
            echo "<td>" . $row['player'] . "</td>";
            echo "<td>" . $row['score'] . "</td>";
            echo "</tr>";
        }
    }
    ?>
</table>