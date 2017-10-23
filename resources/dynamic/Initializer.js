(function () {
    var maxdiff = new MaxDiff({
        instanceId: {%= CurrentADC.InstanceId %},
        currentQuestion: '{%:= CurrentQuestion.Shortcut %}',
        leastQuestion: '{%= CurrentADC.PropQuestion("leastQuestion").Shortcut %}'
    });
} ());