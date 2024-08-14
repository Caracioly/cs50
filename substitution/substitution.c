#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>

typedef struct
{
    char value;
    char key;
} KeysType;

bool validate_args(int argc, string argv[]);
string formated_key(string argb[]);
string encipher(string plain_text, KeysType keys[]);

int main(int argc, string argv[])
{
    // certify the program will only takes 2 args
    if (argc != 2)
    {
        printf("Usage: ./substitution key\n");
        return 1;
    }
    // validade the arg format
    bool is_args_valid = validate_args(argc, argv);
    if (!is_args_valid)
    {
        return 1;
    }
    string key = formated_key(argv);

    // array of values for translate
    KeysType keys[26] = {{'a', key[0]},  {'b', key[1]},  {'c', key[2]},  {'d', key[3]},
                         {'e', key[4]},  {'f', key[5]},  {'g', key[6]},  {'h', key[7]},
                         {'i', key[8]},  {'j', key[9]},  {'k', key[10]}, {'l', key[11]},
                         {'m', key[12]}, {'n', key[13]}, {'o', key[14]}, {'p', key[15]},
                         {'q', key[16]}, {'r', key[17]}, {'s', key[18]}, {'t', key[19]},
                         {'u', key[20]}, {'v', key[21]}, {'w', key[22]}, {'x', key[23]},
                         {'y', key[24]}, {'z', key[25]}};

    // get plaintext
    string plain_text = get_string(" plaintext: ");

    // encipher
    string cipher_text = encipher(plain_text, keys);

    // print ciphertext
    printf("ciphertext: %s\n", cipher_text);
}

bool validate_args(int argc, string argv[])
{
    int lenght = strlen(argv[1]);
    if (lenght != 26)
    {
        printf("Key must contain 26 characteres.\n");
        return false;
    }
    for (int i = 0; i < lenght; i++)
    {
        if (!isalpha(argv[1][i]))
        {
            printf("Key must only contain alphabetic characteres.\n");
            return false;
        }
    }
    for (int i = 0; i < lenght; i++)
    {
        char letter = argv[1][i];
        for (int j = i + 1; j < lenght; j++)
        {
            if (letter == argv[1][j])
            {
                printf("Key must not contain repeated characteres.\n");
                return false;
            }
        }
    }

    return true;
}

string formated_key(string argv[])
{
    for (int i = 0; i < strlen(argv[1]); i++)
    {
        argv[1][i] = tolower(argv[1][i]);
    }
    return argv[1];
}

string encipher(string plain_text, KeysType keys[])
{
    int lenght = strlen(plain_text);
    for (int i = 0; i < lenght; i++)
    {
        if (isalpha(plain_text[i]))
        {
            if (isupper(plain_text[i]))
            {
                int index = plain_text[i] - 'A';
                char upper_key = toupper(keys[index].key);
                plain_text[i] = upper_key;
            }
            else
            {
                int index = plain_text[i] - 'a';
                plain_text[i] = keys[index].key;
            }
        }
    }
    return plain_text;
}
