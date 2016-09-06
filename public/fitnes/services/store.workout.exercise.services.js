'use strict';

/* Services */
angular.module('fitnes').value("appEvents", {
        workout: { exerciseStarted: "event:fitness:exerciseStarted" }
    });

angular.module('fitnes').factory("WorkoutService", ['WorkoutPlan', 'Exercise', 
  function (WorkoutPlan, Exercise) {
        var service = {};
        var workouts = [];
        var exercises = [];
        service.getExercises = function () {
            return exercises;
        };

        service.getWorkouts = function () {
            return workouts;
        };

        var setupInitialExercises = function () {
            exercises.push(
              new Exercise({
                name: "jumpingJacks",
                title: "Jumping Jacks",
                description: "A jumping jack or star jump, also called side-straddle hop is a physical jumping exercise.",
                image: "fitnes/img/JumpingJacks.png",
                nameSound: "../content/jumpingjacks.wav",
                videos: ["dmYwZH_BNd0", "BABOdJ-2Z6o", "c4DAnQ6DtF8"],
                procedure: "Assume an erect position, with feet together and arms at your side.\
                            Slightly bend your knees, and propel yourself a few inches into the air.\
                            While in air, bring your legs out to the side about shoulder width or slightly wider.\
                            As you are moving your legs outward, you should raise your arms up over your head; arms should be slightly bent throughout the entire in-air movement.\
                            Your feet should land shoulder width or wider as your hands meet above your head with arms slightly bent"
            }));
        exercises.push(
              new Exercise({
                name: "wallSit",
                title: "Wall Sit",
                description: "A wall sit, also known as a Roman Chair, is an exercise done to strengthen the quadriceps muscles.",
                image: "fitnes/img/wallsit.png",
                nameSound: "../content/wallsit.wav",
                videos: ["y-wV4Venusw", "MMV3v4ap4ro"],
                procedure: "Place your back against a wall with your feet shoulder width apart and a little ways out from the wall.\
                            Then, keeping your back against the wall, lower your hips until your knees form right angles. "
            }));
        exercises.push(
            new Exercise({
                name: "pushUp",
                title: "Push Up",
                description: "A push-up is a common exercise performed in a prone position by raising and lowering the body using the arms",
                image: "fitnes/img/Pushup.png",
                nameSound: "../content/pushups.wav",
                videos: ["Eh00_rniF8E", "ZWdBqFLNljc", "UwRLWMcOdwI", "ynPwl6qyUNM", "OicNTT2xzMI"],
                procedure: "Lie prone on the ground with hands placed as wide or slightly wider than shoulder width. \
                            Keeping the body straight, lower body to the ground by bending arms at the elbows. \
                            Raise body up off the ground by extending the arms."
            }));
        exercises.push(
            new Exercise({
                name: "crunches",
                title: "Abdominal Crunches",
                description: "The basic crunch is a abdominal exercise in a strength-training program.",
                image: "fitnes/img/crunches.png",
                nameSound: "../content/crunches.wav",
                videos: ["Xyd_fa5zoEU", "MKmrqcoCZ-M"],
                procedure: "Lie on your back with your knees bent and feet flat on the floor, hip-width apart.\
                              Place your hands behind your head so your thumbs are behind your ears.\
                              Hold your elbows out to the sides but rounded slightly in.\
                              Gently pull your abdominals inward.\
                              Curl up and forward so that your head, neck, and shoulder blades lift off the floor.\
                              Hold for a moment at the top of the movement and then lower slowly back down."
            }));

        };

        var setupInitialWorkouts = function () {
            var exercises = service.getExercises();
            var workout = new WorkoutPlan({
                name: "Fitness",
                title: "Fitness",
                description: "A high intensity workout that consists of 4 exercises.",
                restBetweenExercise: 10
            });

            workout.exercises.push({
                details: exercises[0],
                duration: 30
            });
            workout.exercises.push({
                details: exercises[1],
                duration: 30
            });
             workout.exercises.push({
                details: exercises[2],
                duration: 30
            });
            workout.exercises.push({
                details: exercises[3],
                duration: 30
            });
            workouts.push(workout);
        };

	service.getWorkout = function (name) {
            var result = null;
            angular.forEach(service.getWorkouts(), function (workout) {
                if (workout.name === name) result = angular.copy(workout);
            });
            return result;
        };

    service.getExercise = function (name) {
            var result = null;
            angular.forEach(service.getExercises(), function (exercise) {
                if (exercise.name === name) result = angular.copy(exercise);
            });
            return result;
        };

        service.updateWorkout = function (workout) {
            var workoutIndex;
            for (var i = 0; i < workouts.length; i++) {
                if (workouts[i].name === workout.name) {
                    workouts[i] = workout;
                    break;
                }
            }
            return workout;
        };

        service.updateExercise = function (exercise) {
            var exerciseIndex;
            for (var i = 0; i < exercises.length; i++) {
                if (exercises[i].name === exercise.name) {
                    exercises[i] = exercise;
                    break;
                }
            }
            return exercise;
        };

        service.addWorkout = function (workout) {
            if (workout.name) {
                workouts.push(workout);
                return workout;
            }
        };

        service.addExercise = function (exercise) {
            if (exercise.name) {
                exercises.push(exercise);
                return exercise;
            }
        };

        var init = function () {
            setupInitialExercises();
            setupInitialWorkouts();
        };

        init();
        return service;
    }]);

