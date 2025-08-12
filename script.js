// 要素取得
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const clearAllBtn = document.getElementById("clearAllBtn");

// 追加ボタンの処理
addBtn.addEventListener("click", () => {
    const task = todoInput.value.trim();

    if (task === "") {
        alert("入力してください");
        return;
    }

    // li要素を作成
    const li = document.createElement("li");
    li.textContent = task;

    // 完了切り替え（クリックでdoneクラス付与）
    li.addEventListener("click", () => {
        li.classList.toggle("done");
    });

    // 右クリックで削除
    li.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (confirm("削除しますか？")) {
            li.remove();
        }
    });

    // リストに追加
    todoList.appendChild(li);

    // 入力欄を空に
    todoInput.value = "";
});

// 全削除ボタンの処理
clearAllBtn.addEventListener("click", () => {
    if (confirm("全てのタスクを削除しますか？")) {
        todoList.innerHTML = "";
    }
});
