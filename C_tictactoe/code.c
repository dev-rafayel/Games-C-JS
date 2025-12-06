#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

#define SIZE 3

char player = 'X';

void startMessage(void);
void spaceInBoard(char board[][SIZE]);
void renderBoard(char board[][SIZE]);
bool inputField(char board[][SIZE], int);
bool noViolate(char board[][SIZE], int);
bool isWin(char board[][SIZE]);
bool isDraw(char board[][SIZE]);
void changePlayer(char *player);
void startGame(void);

int main()
{
    startGame();


    return 0;
}

void startMessage(void) {
    printf("You are \"%c\" player. Let's start the game!\n", player);
    printf("Enter your move: ");
}

void spaceInBoard(char board[SIZE][SIZE]) {
    for(int i = 0; i < SIZE ; ++i) {
        for(int j = 0; j < SIZE; ++j) {
            board[i][j] = ' ';
        }
    }
}

void renderBoard(char board[SIZE][SIZE])
{
    printf("\n");
    printf(" %c | %c | %c\n", board[0][0], board[0][1], board[0][2]);
    printf("---|---|---\n");
    printf(" %c | %c | %c\n", board[1][0], board[1][1], board[1][2]);
    printf("---|---|---\n");
    printf(" %c | %c | %c\n", board[2][0], board[2][1], board[2][2]);
}

bool inputField(char board[SIZE][SIZE], int field)
{
    // first line
    if (field == 1 && board[0][0] == ' ')
    {
        board[0][0] = player;
        return true;
    }

    if (field == 2 && board[0][1] == ' ') 
    {
        board[0][1] = player;
        return true;
    }

    if (field == 3 && board[0][2] == ' ')
    {
        board[0][2] = player;
        return true;
    }

    // second line

    if (field == 4 && board[1][0] == ' ')
    {
        board[1][0] = player;
        return true;
    }

    if (field == 5 && board[1][1] == ' ')
    {
        board[1][1] = player;
        return true;
    }

    if (field == 6 && board[1][2] == ' ')
    {
        board[1][2] = player;
        return true;
    }

    // third line

    if (field == 7 && board[2][0] == ' ')
    {
        board[2][0] = player;
        return true;
    }

    if (field == 8 && board[2][1] == ' ')
    {
        board[2][1] = player;
        return true;
    }

    if (field == 9 && board[2][2] == ' ')
    {
        board[2][2] = player;
        return true;
    }

    return false;
}

bool noViolate(char board[SIZE][SIZE], int field)
{
    if (field >= 1 && field <= 9) 
    {
        return inputField(board, field);
    } 
    return false;
}

bool isWin(char board[SIZE][SIZE])
{
    // checking lines
    for (int i = 0; i < SIZE; ++i)
    {
        int rowWin = 1;
        for (int j = 0; j < SIZE; ++j)
        {
            if (board[i][j] != player)
            {
                rowWin = 0;
                break;
            }
        }
        if (rowWin)
        {
            printf("Player \"%c\" Won! Congratulations!!!\n", player);
            return true;
        }
    }

    // checking cols
    for (int j = 0; j < SIZE; ++j) 
    {
        int colWin = 1;
        for (int i = 0; i < SIZE; ++i)
        {
            if (board[i][j] != player)
            {
                colWin = 0;
                break;
            }
        }
        if (colWin)
        {
            printf("Player \"%c\" Won! Congratulations!!!\n", player);
            return true;
        }
    }

    // checking main diog
    int mainDiogWin = 1;
    for (int i = 0; i < SIZE; ++i)
    {
        if (board[i][i] != player) 
        {
            mainDiogWin = 0;
            break;
        }
    }
    if (mainDiogWin)
    {
        printf("Player \"%c\" Won! Congratulations!!!\n", player);
        return true;
    }


    // checking another diog
    int anotherDiogWin = 1;
    for (int i = 0; i < SIZE; ++i)
    {
        if (board[i][SIZE - i - 1] != player)
        {
            anotherDiogWin = 0;
            break;
        }
    }
    if (anotherDiogWin)
    {
        printf("Player \"%c\" Won! Congratulations!!!\n", player);
        return true;
    }
    
    return false;
}

bool isDraw(char board[SIZE][SIZE])
{
    for (int i = 0; i < SIZE; ++i)
    {
        for (int j = 0; j < SIZE; ++j)
        {
            if (board[i][j] == ' ') 
            {
                return false;
            }
        }
    }
    return true;
}

void changePlayer(char *player)
{
    *player = (*player == 'X') ? 'O' : 'X';
    printf("%c's turn. Enter your move (1-9): ", *player);
}

void startGame(void)
{
    char board[SIZE][SIZE];
    int field = 0;
    printf("Welcome to TicTacToe! Enjoy the game.\n");
    spaceInBoard(board);
    renderBoard(board);
    startMessage();
    
    while (true)
    {
        if (scanf("%d", &field) != 1)
        {
            printf("Invalid move! Enter only positive digits (1-9).\n");
            printf("Enter your move: ");
            while(getchar() != '\n');
            continue;
        }

        if (noViolate(board, field) == false)
        {
            printf("Invalid move! Try again.\n");
            renderBoard(board);
            printf("Enter your move: ");
            continue;
        } 
        
        renderBoard(board);

        // checking if one of the players won
        if (isWin(board))
        {
            // renderBoard(board);
            break;
        }

        // checking if it's draw or not
        if (isDraw(board))
        {
            renderBoard(board);
            printf("It's a draw!\n");
            break;
        }
        changePlayer(&player);
    }
}