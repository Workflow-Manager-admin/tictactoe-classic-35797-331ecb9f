#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-classic-35797-331ecb9f/tic_tac_toe_game
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

