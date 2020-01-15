// Quick sort implemented in C++

class QuickSort {
private:
    static void exchange(vector<int>& array, int i, int j) {
        int tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
    static int partition(vector<int>& array, int lo, int hi) {
        int value = array[lo];
        int j = lo;

        for (int i = lo; i < hi; i++) {
            if (array[j] <= value) {
                j++;
            }
            if (array[i] <= value && array[j] > value && i > j) {
                QuickSort::exchange(array, i, j);
                j++;
            }
        }
        j--;
        QuickSort::exchange(array, lo, j);
        return j;
    }
    static void sort(vector<int>& array, int lo, int hi) {
        if (lo >= hi) return;
        int mid = partition(array, lo, hi);
        sort(array, lo, mid);
        sort(array, mid + 1, hi);
    }
public:
    static void sort(vector<int>& array) {
        sort(array, 0, (int)array.size());
    }
};

int main(int argc, const char * argv[]) {
    vector<int> v({5, 4, 3, 5, 6, 8, 1, 9, 0, 3});
    QuickSort::sort(v);
    for (int value: v) {
        cout << value << ", ";
    }
    return 0;
}
