function initPath(path) {
  var length = path.getTotalLength();
  // Clear any previous transition
  path.style.transition = path.style.WebkitTransition =
    'none';
  // Set up the starting positions
  path.style.strokeDasharray = length + ' ' + length;
  path.style.strokeDashoffset = length;
  // Trigger a layout so styles are calculated & the browser
  // picks up the starting position before animating
  path.getBoundingClientRect();
}

function pathPrepare($el) {
  var lineLength = $el.getTotalLength();
  $el.style.strokeDasharray = lineLength;
  $el.style.strokeDashoffset = lineLength;
}

function valBetween(v, min, max) {
  return (Math.min(max, Math.max(min, v)));
}

$(document).ready(function() {
  var $happy = $(".happy-path");
  var $path = $(".path-ticket");
  var $ticket = $(".ticket");
  initPath($path.get(0));
  initPath($happy.get(0));
  var $dashOffsetHappy = $happy.css("stroke-dashoffset");
  var $dashOffset = $path.css("stroke-dashoffset");

  $(window).on('scroll', function() {
    var $percentageComplete = (($(window).scrollTop() / ($("html").height() - $(window).height())) * 100);
    var $newUnitHappy = parseInt($dashOffsetHappy, 10);
    var $newUnit = parseInt($dashOffset, 10);
    var $offsetUnitPathHappy = valBetween(($percentageComplete) * 4, 0, 100) * ($newUnitHappy / 100);
    var $offsetUnitPath = valBetween(($percentageComplete - 50) * 4, 0, 100) * ($newUnit / 100);
    $happy.css("stroke-dashoffset", $newUnitHappy - $offsetUnitPathHappy);
    $('.happy').css('opacity', ((50 - $percentageComplete) * 4) / 100);
    $path.css("stroke-dashoffset", $newUnit - $offsetUnitPath);
    $ticket.css("opacity", (($percentageComplete - 75) * 5) / 100);
  });
});
