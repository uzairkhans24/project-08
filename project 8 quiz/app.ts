#!/usr/bin/env node

import * as readline from 'readline';

interface Question {
    question: string;
    choices: string[];
    correctAnswer: number;
}

const questions: Question[] = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "Who wrote 'To be, or not to be'?",
        choices: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        correctAnswer: 1
    }
];

class Quiz {
    private score: number;
    private currentQuestionIndex: number;

    constructor(private questions: Question[]) {
        this.score = 0;
        this.currentQuestionIndex = 0;
    }

    start() {
        console.log("Welcome to the quiz!");
        this.askQuestion();
    }

    private askQuestion() {
        if (this.currentQuestionIndex < this.questions.length) {
            const question = this.questions[this.currentQuestionIndex];
            console.log(`\n${question.question}`);
            question.choices.forEach((choice, index) => {
                console.log(`${index + 1}. ${choice}`);
            });

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question('Your answer (1-4): ', (answer) => {
                this.checkAnswer(parseInt(answer) - 1);
                rl.close();
                this.askQuestion();
            });
        } else {
            this.endQuiz();
        }
    }

    private checkAnswer(answer: number) {
        const question = this.questions[this.currentQuestionIndex];
        if (answer === question.correctAnswer) {
            console.log('Correct!');
            this.score++;
        } else {
            console.log(`Wrong. The correct answer is ${question.choices[question.correctAnswer]}.`);
        }
        this.currentQuestionIndex++;
    }

    private endQuiz() {
        console.log(`\nQuiz over! Your score is ${this.score} out of ${this.questions.length}.`);
    }
}

const quiz = new Quiz(questions);
quiz.start();
