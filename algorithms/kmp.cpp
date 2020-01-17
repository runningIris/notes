// KMP implemented in C++

class KMP {
public:
    static vector<int> CreateStatesMachine(string& pattern) {
        const int N = (int)pattern.size();
        vector<int> states;
        int i = 1;
        int j = -1;
        states.push_back(-1);
        for (i; i < N; i++) {
            // 这里可以一步步地退 j 来检查，但使用 j = states[j] 的方式来回溯可以省很多不必要的检查
            while (j > -1 && pattern[j+1] != pattern[i]) {
                j = states[j];
            }
            if (pattern[j+1] == pattern[i]) j++;
            states.push_back(j);
        }
        return states;
    }
public:
    static int Search(string& text, string& pattern) {
        const vector<int> states = KMP::CreateStatesMachine(pattern);
        const int size = (int)text.size();
        const int N = (int)pattern.size();
        int m = 0; // text 的下标
        int n = 0; // pattern 的下标
        while (m < size) {
            if (text[m] != pattern[n]) {
                if (n > 0) {
                    n = states[n-1] + 1;
                } else {
                    m++;
                }
            } else {
                n++;
                m++;
            }
            // 找到匹配的情况
            if (n == N) {
                return m - n;
            }
        }
        return -1;
    }
};

// testing
int main(int argc, const char * argv[]) {
    string text = "CAABAAACAABAACAABBA";
    string pattern = "CAABAAC";
    cout << KMP::Search(text, pattern) << endl;
    vector<int> state = KMP::CreateStatesMachine(pattern);
    int m = 0;
    while(m < (int)state.size()) {
        cout << state[m] << ", ";
        m++;
    }
    return 0;
}
